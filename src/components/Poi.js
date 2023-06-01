/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Reducer";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import SearchIcon from "@material-ui/icons/Search";
import RecommendIcon from "@mui/icons-material/Recommend";
import IconButton from "@mui/material/IconButton";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles({
  heading: {
    textAlign: "center",
    margin: "20px 0",
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f2f2f2",
    },
  },
});

const Poi = () => {
  const { state } = useAuth(); //to control or know user state
  const classes = useStyles(); //to create various styles
  const locationIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  const mapRef = useRef();
  const [searchTerm, setSearchTerm] = useState(""); //to capture search term value
  const [searchResults, setSearchResults] = useState([]); //search result
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [review, setReview] = useState("");
  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid black",
    backgroundColor: "eff2f5",
  };

  const labelStyles = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  };

  const inputStyles = {
    padding: "5px",
    marginBottom: "10px",
    width: "100%",
  };

  const buttonStyles = {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
  };
  const popupStyles = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
  };

  const inputPopStyles = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
  };

  const buttonPopStyles = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
    opacity: "0.9",
  };

  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    type: "",
    country: "",
    region: "",
    lat: "",
    lon: "",
    description: "",
  });
  const [isRecommended, setIsRecommended] = useState(false);
  const [isClicked, setIsClicked] = useState(false); //to know if button clicked
  const [hasRecommended, setHasRecommended] = useState(false); //to control whether recommended or not
  const [myArray, setMyArray] = useState([]); //array created to count number of recommendations
  const [header, setHeader] = useState(false); //to hide the table headers if no search result
  const [error, setError] = useState(null); // to catch error in fetch process
  //to capture latitude and longtude from button click
  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setFormData({ ...formData, lat, lon: lng });
      },
    });
  }
  //bound function used to center the map towards search results
  useEffect(() => {
    if (searchResults.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(
        searchResults.map((poi) => [poi.lat, poi.lon])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [searchResults]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  //refresh the page to add more items
  const addMorePoi = () => {
    window.location.reload();
  };
  // function to handle recommend
  const handleRecommend = async (item) => {
    try {
      if (hasRecommended) {
        alert("You have already recommended this Poi!");
        return;
      }
      console.log(`Recommend clicked for item ID: ${item}`);
      const response = await fetch(`http://localhost:5001/poi/poirec/${item}`, {
        method: "PUT",
      });

      if (response.ok) {
        //loop to add items to the array
        if (!myArray.includes(item)) {
          setMyArray((prevArray) => [...prevArray, item]);
        }
        if (myArray.length === searchResults.length - 1) {
          setIsRecommended(true);
          setHasRecommended(true);
          setIsClicked(true);
        }
        alert("Thanks Recommend added!");
      } else {
        console.error(response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //function to add poi to database
  const handleSubmitMap = (e) => {
    e.preventDefault();
    // Create a new FormData instance object
    const data = new FormData();
    // Append each form field to formdata
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch("http://localhost:5001/poi/addpoi", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"), // the token is attached here
      },
      body: data, // Pass the FormData instance as the body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormSubmitted(true); // set the state variable to true after form submission
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        err.json().then((errorMessage) => {
          setError(errorMessage.error);
        });
      });
  };
  //function to make the search
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/poi/find?search=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data);
      setHeader(true);
    } catch (error) {
      console.log(error);
    }
  };
  //function to add review to the database
  const handleReview = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const poi_id = formData.get("poi_id");
    const review = formData.get("review");
    fetch("http://localhost:5001/review/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"), // the token is attached here
      },
      body: JSON.stringify({
        poi_id: poi_id,
        review: review,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Story successfully inserted!");
      })
      .catch((err) => {
        err.json().then((errorMessage) => {
          setError(errorMessage.error);
        });
      });
    window.location.reload();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "#eff2f5",
            padding: "10px",
            borderRadius: "33px",
            display: "flex",
            alignItems: "center",
          }}>
          <SearchIcon
            style={{ marginLeft: "20px", color: "black", width: "130px" }}
          />
          <input
            style={{
              borderRadius: "30px",
              backgroundColor: "#eff2f5",
              marginLeft: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              width: "700px",
              padding: "15px",
              outline: "none",
            }}
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="search name, type, country, region "
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#0077FF",
            border: "none",
            borderRadius: "33px",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            marginLeft: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}>
          Search Poi
        </button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="poi table">
          {header && (
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Lon</TableCell>
                <TableCell>Lat</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Recommendations</TableCell>
                <TableCell>Recommend</TableCell>
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {searchResults.length > 0
              ? searchResults.map((item) => (
                  <TableRow key={item.ID} className={classes.tableRow}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.region}</TableCell>
                    <TableCell>{item.lon}</TableCell>
                    <TableCell>{item.lat}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.recommendations}</TableCell>
                    <IconButton
                      color="primary"
                      style={{
                        color: isRecommended ? "blue" : "red",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRecommend(item.ID)}>
                      {" "}
                      <RecommendIcon />
                    </IconButton>
                  </TableRow>
                ))
              : header && (
                  <p
                    style={{
                      display: "flex",
                      color: "red",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <b>There is no result to show.</b>
                  </p>
                )}
          </TableBody>
        </Table>
      </TableContainer>
      <>
        {searchResults.length > 0 ? (
          <MapContainer
            ref={mapRef}
            zoomControl={false}
            center={[searchResults[0].lat, searchResults[0].lon]}
            zoom={13}
            style={{ height: "400px", width: "100%", padding: "4px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {searchResults.map((poi) => (
              <Marker
                key={poi.ID}
                position={[poi.lat, poi.lon]}
                icon={locationIcon}>
                <Popup style={popupStyles}>
                  <strong>{poi.name}</strong>
                  <br />
                  {poi.description}
                  <form onSubmit={handleReview}>
                    {error && <p>{error}</p>}
                    <input
                      type="hidden"
                      id="poi_id"
                      name="poi_id"
                      value={poi.ID}
                    />
                    {state.isLoggedIn && (
                      <input
                        type="textarea"
                        id="review"
                        placeholder="What's on your mind?"
                        required
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        style={inputPopStyles}
                      />
                    )}
                    {state.isLoggedIn ? (
                      <button type="submit" style={buttonPopStyles}>
                        Submit Review
                      </button>
                    ) : (
                      <p>Please, login to add review.</p>
                    )}
                  </form>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div>
            {formSubmitted && (
              <div
                style={{
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                }}>
                {" "}
                <p> Form submitted successfully!!</p>
                {error && <p>{error}</p>}
                <button
                  type="submit"
                  onClick={addMorePoi}
                  style={{
                    backgroundColor: "#0077FF",
                    border: "none",
                    borderRadius: "33px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}>
                  Add More Poi
                </button>
              </div>
            )}
            {!header && !formSubmitted && (
              <div
                style={{
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                }}>
                {state.isLoggedIn ? (
                  <p>Add POI by clicking on the Map!! </p>
                ) : (
                  <p> Please Login to add POI!!</p>
                )}
              </div>
            )}
            <MapContainer
              center={[53.47, -2.23]}
              zoom={13}
              style={{ height: "100vh", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                maxZoom={18}
              />
              {!formSubmitted && <MyComponent />}
              {!formSubmitted && (
                <Marker
                  position={[formData.lat, formData.lon]}
                  icon={locationIcon}>
                  <Popup>
                    {state.isLoggedIn ? (
                      <div style={formStyles}>
                        <p>
                          Please check the details before submit the form!!{" "}
                        </p>
                        <form onSubmit={handleSubmitMap}>
                          <label style={labelStyles}>
                            Photo:
                            <input
                              required
                              type="file"
                              accept="image/*"
                              style={inputStyles}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  photo: e.target.files[0],
                                })
                              }
                            />
                          </label>
                          <label style={labelStyles}>
                            Name:
                            <input
                              required
                              type="text"
                              value={formData.name}
                              style={inputStyles}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label style={labelStyles}>
                            Type:
                            <input
                              required
                              type="text"
                              value={formData.type}
                              style={inputStyles}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  type: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label style={labelStyles}>
                            Country:
                            <input
                              required
                              type="text"
                              value={formData.country}
                              style={inputStyles}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  country: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label style={labelStyles}>
                            Region:
                            <input
                              required
                              type="text"
                              value={formData.region}
                              style={inputStyles}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  region: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label style={labelStyles}>
                            Description:
                            <input
                              required
                              type="text"
                              value={formData.description}
                              style={inputStyles}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                            />
                          </label>
                          <button type="submit" style={buttonStyles}>
                            Submit
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div style={formStyles}>
                        <p>Please, login to upload POI.</p>
                      </div>
                    )}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}
      </>
    </>
  );
};

export default Poi;
