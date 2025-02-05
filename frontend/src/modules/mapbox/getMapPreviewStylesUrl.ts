function GetMapPreviewStylesUrl(layer: string, lon: number, lat: number) {
    return 'https://api.mapbox.com/styles/v1/' + layer + '/static/' + lon + ',' + lat + ',11,0/300x300@2x?access_token=' + process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
}

export default GetMapPreviewStylesUrl;