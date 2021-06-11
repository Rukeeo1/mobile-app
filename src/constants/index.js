import { Dimensions } from 'react-native';

const colors = {
  black: '#000000',
  blue: '#002B55',
  blueLigth: '#085BAC',
  blue100: '#4099EF',
  green: '#A6CB42',
  greenTransparent: '#f0fdcd',
  greenDeep: '#83B403',
  greenLight: '#dbfa88',
  grey100: '#D8D8D8',
  grey200: '#F4F4F4',
  grey: '#EBEBEB',
  greyDark: '#9B9B9B',
  greyLight: '#E5E5E5',
  pink: '#E8357F',
  pinkDeep: '#AD0048',
  purshBlue: '#1369BE',
  purshBlueDeep: '#002B55',
  textColor: '#1A1A1A',
  white: '#ffffff',
  nearWhite: '#F7F7F7',
  red: '#FF4A95',
  redDeep: '#AD0048',
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthsAbr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const defaultCalendarDay = new Date().getDate() + 1;
const defaultCalendarYear = new Date().getFullYear();

export default {
  colors,
  screenHeight,
  screenWidth,
  months,
  monthsAbr,
  defaultCalendarDay,
  defaultCalendarYear
};

export const API_URL = 'http://api.growit-app.co.uk:3000/api/v1'
export const GOOGLE_API_KEY = 'AIzaSyBk-9XknUOxTL2keqWWW5Q7Bh0joPTN6m8'
