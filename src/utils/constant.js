import { Dimensions } from "react-native";

export const SCREEN_SIZE = {
  device_height: Dimensions.get('window').height,
  device_width: Dimensions.get('window').width
}

export const PADDING = {
  paddingVertical: SCREEN_SIZE.device_height / 25,
  paddingHorizontal: SCREEN_SIZE.device_width / 25,
}

export const MARGIN = {
  marginVertical: SCREEN_SIZE.device_height / 25,
  marginHorizontal: SCREEN_SIZE.device_width / 25
}

export const BORDER_RADIUS = {
  borderRadius: SCREEN_SIZE.device_height / 100,
}

export const FONT_SIZE = {
  font_size_smallest: SCREEN_SIZE.device_height / 100,
  font_size_small: SCREEN_SIZE.device_height / 50,
  font_size_medium: SCREEN_SIZE.device_height / 25,
  font_size_large: SCREEN_SIZE.device_height / 12.5,
  font_size_largest: SCREEN_SIZE.device_height / 6.25,
}