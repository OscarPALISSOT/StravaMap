import gpxLayerType from "@/types/mapbox/gpxLayerType";

function GpxHexToRGB(hex_value: string, gpxLayer: gpxLayerType): string {
  const numericValue = parseInt(hex_value.slice(1), 16);
  const r = numericValue >> 16 & 0xFF;
  const g = numericValue >> 8 & 0xFF;
  const b = numericValue & 0xFF;
  switch (gpxLayer) {
    case 'bySportType':
      return `rgb(${r}, ${g}, ${b})`
    case 'bySportTypeHeat':
      return `rgba(${r}, ${g}, ${b}, 0.3)`
    case 'heatGlobal':
      return `rgba(252, 76, 2, 0.3)`
    case 'stravaGlobal':
      return `rgb(252, 76, 2)`
    default:
      return `rgb(${r}, ${g}, ${b})`
  }

}

export default GpxHexToRGB;