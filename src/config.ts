export default {
  emoji: {
    success: {
      custom: "<:checkemoji:672073550886338626>",
      default: ":white_check_mark:"
    },
    error: {
      "custom": "<:xemoji:672073562307297293>",
      "default": ":x:"
    },
    warn: {
      custom: "<:warn:733277985133690881>",
      default: ":warning:"
    },
    general: {
      default: ":gear:"
    },
    developer: {
      custom: "<:bot:704365810076090468>",
      default: ":hammer:"
    },
    image: {
      default: ":camera_with_flash:"
    }
  },
  colours: {
    default: "#0099FF",
    green: "#00CC33",
    red: "#FF0033",
    yellow: "#FFCC33"
  },
  api: {
    port: 3000,
    host: "localhost",
    prod: false
  },
  onDatabaseStartUp: {},
  imageAPI: {
    host: "localhost",
    port: 3030,
    password: null
  }
};
