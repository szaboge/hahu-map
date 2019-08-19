import {BaseIconOptions, Icon} from 'leaflet';

const baseOptions: BaseIconOptions = {
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
};

const blue = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-blue.png'
});

const red = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-red.png'
});

const green = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-green.png'
});

const orange = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-orange.png'
});

const yellow = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-yellow.png'
});

const violet = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-violet.png'
});

const grey = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-grey.png'
});

const black = new Icon({
  ...baseOptions,
  iconUrl: 'assets/leaflet/marker-icon-2x-black.png'
});

const icons = {blue, red, green, orange, yellow, violet, grey, black};

export {icons};
