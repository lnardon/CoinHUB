//If data comes as an object of currencies it returns only the usd value
const getCurrencyData = (data, max) => {
  let newData;
  if (typeof data === "object") {
    newData = data?.usd;
  } else {
    newData = data;
  }
  return getToFixed(newData, max);
};

// Limits usd price to only 6 digits after (.)
const getToFixed = (data, max) => {
  let aux = (data + "").split(".");
  if (aux[1]) {
    return max >= aux[1].length
      ? data.toFixed(aux[1].length)
      : data.toFixed(max);
  }
  return data;
};

export const dataFormatter = (data, type) => {
  switch (type) {
    case "currency":
      const usdFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let floatPrice = parseFloat(getCurrencyData(data, 6));
      if (floatPrice < 0.01) {
        return `$${floatPrice}`;
      }
      return usdFormatter.format(floatPrice);

    case "percentage":
      return `${getCurrencyData(data, 2)}%`;

    case "units":
      return `${data}`;
    default:
      break;
  }
};
