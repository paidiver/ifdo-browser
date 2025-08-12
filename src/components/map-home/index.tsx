'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
// import * as protomapsL from 'protomaps-leaflet';
// import { FeatureCollection } from 'geojson';

interface MapProps {
  dataset?: any;
  image?: any;
}

// const bboxPolygon = (bounds: number[]) => {
//   const LL_EPSILON = 1e-6;
//   return {
//     type: 'Feature',
//     geometry: {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [bounds[0] + LL_EPSILON, bounds[1] + LL_EPSILON],
//           [bounds[2] - LL_EPSILON, bounds[1] + LL_EPSILON],
//           [bounds[2] - LL_EPSILON, bounds[3] - LL_EPSILON],
//           [bounds[0] + LL_EPSILON, bounds[3] - LL_EPSILON],
//           [bounds[0] + LL_EPSILON, bounds[1] + LL_EPSILON]
//         ]
//       ]
//     },
//     properties: {}
//   };
// };

// function MvtLayer({ tileJsonUrl, tileUrl }: { tileJsonUrl: string; tileUrl: string }) {
// function MvtLayer({ dataset }: { dataset: any }) {
//   const map = useMap();
//   console.log('aaaa', dataset);
//   const path = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8081/v1/';

//   // const tileJsonUrl = `http://0.0.0.0:8081/v1/ogc-tiles/collections/public.images/tiles/WebMercatorQuad/tilejson.json?dataset_id=${dataset.id}`;
//   // const tileUrl = `http://0.0.0.0:8081/v1/ogc-tiles/collections/public.images/tiles/WebMercatorQuad/{z}/{x}/{y}?dataset_id=${dataset.id}`;
//   const tileJsonUrl = `${path}ogc-tiles/collections/public.images/tiles/WebMercatorQuad/tilejson.json?dataset_id=${dataset.id}`;
//   // const tileUrl = `http://0.0.0.0:8081/collections/public.images/tiles/WebMercatorQuad/{z}/{x}/{y}`;
//   console.log('tileJsonUrl', tileJsonUrl);

//   useEffect(() => {
//     fetch(tileJsonUrl)
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch TileJSON');
//         return res.json();
//       })
//       .then(data => {
//         // Adjust bounds
//         const bounds = [...data.bounds];
//         // Optional clipping with dataset's known bbox from API
//         // bounds = [
//         //   Math.max(bounds[0], minX),
//         //   Math.max(bounds[1], minY),
//         //   Math.min(bounds[2], maxX),
//         //   Math.min(bounds[3], maxY)
//         // ];

//         // Create bounding box GeoJSON & fit map
//         const geo = {
//           type: 'FeatureCollection',
//           features: [bboxPolygon(bounds)]
//         } as FeatureCollection;
//         map.fitBounds(L.geoJSON(geo).getBounds());

//         // add the geo to the map
//         map.addLayer(
//           L.geoJSON(geo, {
//             style: {
//               color: '#0062ff',
//               fillColor: '#82b2ff',
//               weight: 2,
//               fillOpacity: 0.5
//             }
//           })
//         );

//         // Prepare paint rules
//         // const layer = Object.values(data.vector_layers)[0] as any;
//         // const paintRules = [
//         //   {
//         //     dataLayer: layer.id,
//         //     symbolizer: new protomapsL.LineSymbolizer({
//         //       color: '#000000',
//         //       width: 2
//         //     }),
//         //     minzoom: layer.minzoom,
//         //     maxzoom: layer.maxzoom
//         //   }
//         // ];

//         // Add protomaps vector layer
//         // protomapsL.leafletLayer({ url: tileUrl }).addTo(map);
//         // protomapsL.leafletLayer({ url: tileUrl, paintRules }).addTo(map);
//       })
//       .catch(err => {
//         console.warn(err);
//       });
//   }, [tileJsonUrl, map]);

//   return null;
// }

export default function MapHome({ dataset, image }: MapProps) {
  let position: LatLngExpression;

  if (image) {
    position = [image.latitude || 0, image.longitude || 0];
  } else {
    position = [dataset.latitude || 0, dataset.longitude || 0];
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ifdo-browser' : '';
  const icon = L.icon({
    iconUrl: `${basePath}/marker-icon.png`,
    iconSize: [10, 10]
  });

  return (
    <div className="w-full h-[500px]">
      <MapContainer center={position} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {image && image?.latitude && image?.longitude ? (
          <Marker position={[image.latitude, image.longitude]} icon={icon} key={image.id}>
            <Popup>
              <div>
                <strong>{image.name}</strong>
                <p>
                  Lat: {image.latitude}, Lon: {image.longitude}
                </p>
                <p>
                  <a
                    href={`/image?id=${image.id}&dataset_id=${image.dataset_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Image
                  </a>
                </p>
              </div>
            </Popup>
          </Marker>
        ) : (
          dataset.images.map(
            (image: any) =>
              image.latitude &&
              image.longitude && (
                <Marker position={[image.latitude, image.longitude]} icon={icon} key={image.id}>
                  <Popup>
                    <div>
                      <strong>{image.name}</strong>
                      <p>
                        Lat: {image.latitude}, Lon: {image.longitude}
                      </p>
                      <p>
                        <a
                          href={`/image?id=${image.id}&dataset_id=${image.dataset_id}`}
                          className="text-blue-500 hover:underline"
                        >
                          View Image
                        </a>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )
          )
        )}
        {/* {dataset && <MvtLayer dataset={dataset} />} */}
      </MapContainer>
    </div>
  );
}
