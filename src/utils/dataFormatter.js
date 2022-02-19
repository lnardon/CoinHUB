//If data comes as an object of currencies it returns only the usd value
const getCurrencyData = (data) => {
  if (typeof data === "object") {
    return data?.usd;
  } else {
    return data;
  }
};

export const dataFormatter = (data, type) => {
  switch (type) {
    case "currency":
      const usdFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return usdFormatter.format(getCurrencyData(data));

    case "percentage":
      return `${getCurrencyData(data).toFixed(2)}%`;

    case "units":
      return `${data}`;
    default:
      break;
  }
};
