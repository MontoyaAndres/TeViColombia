import React from "react";
import Geosuggest from "react-geosuggest";

// https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/63_google_maps/packages/web/src/modules/shared/LocationField.tsx
// https://www.youtube.com/watch?v=xLlIgokKiLc
const editGoogleMapsLocalization = ({ form: { setFieldValue } }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Localización en Google Maps</div>
    </div>

    <div className="card-content">
      <div className="content">
        <div className="field">
          <div className="control">
            <Geosuggest
              placeholder="Localización"
              inputClassName="input is-hovered is-medium"
              onSuggestSelect={values => console.log(values)}
              location={new window.google.maps.LatLng(53.558572, 9.9278215)}
              radius={20}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default editGoogleMapsLocalization;
