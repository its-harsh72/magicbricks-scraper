// "use client";

// import dynamic from "next/dynamic";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// interface MarkerType {
//   name: string;
//   lat: number;
//   lng: number;
//   price: string;
//   builder: string;
// }

// export default function MapComponent({ markers }: { markers: MarkerType[] }) {
//   if (!markers || markers.length === 0) return null;

//   return (
//     <div className="w-full h-[400px] mt-4">
//       <MapContainer
//         center={[markers[0].lat, markers[0].lng]}
//         zoom={11}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {markers.map((m, i) => (
//           <Marker key={i} position={[m.lat, m.lng]}>
//             <Popup>
//               <b>{m.name}</b> <br />
//               {m.price} <br />
//               {m.builder}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }
"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MarkerType } from "@/types";

// Fix Leaflet marker icon path
const DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({ markers }: { markers: MarkerType[] }) {
  if (!markers.length) return null;

  return (
    <div className="w-full h-[400px] mt-4">
      <MapContainer
        center={[markers[0].lat, markers[0].lng]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              <b>{m.name}</b> <br />
              {m.price} <br />
              {m.builder}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
