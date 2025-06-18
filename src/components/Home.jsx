import { useEffect, useState } from "react";
import Card from "./Card";
import Carousal from "./Carousal";

const Home = () => {
  let [search, setSearch] = useState("");
  let [foodCat, setFoodCat] = useState([]);
  let [foodItems, setFoodItems] = useState([]);
  let loadData = async () => {
    let response = await fetch("http://localhost:3000/api/foundData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    let json = await response.json();
    setFoodItems(json[0]);
    setFoodCat(json[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade mb-5 shadow-lg rounded overflow-hidden position-relative"
          data-bs-ride="carousel"
        >
          {/* 🖼️ Carousel Slides */}
          <div className="carousel-inner">
            {[
              "https://plus.unsplash.com/premium_photo-1684534125599-695aa8215694?q=80&w=1200&auto=format&fit=crop",
              "https://plus.unsplash.com/premium_photo-1684534125326-2c19a87ca7ab?q=80&w=1470&auto=format&fit=crop",
              "https://plus.unsplash.com/premium_photo-1683862104638-7649e0ef87dc?q=80&w=1470&auto=format&fit=crop",
            ].map((src, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={src}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{
                    height: "500px",
                    objectFit: "cover",
                    filter: "brightness(65%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 🔍 Sleek Search Section */}
          <div
            className="position-absolute bottom-0 start-50 translate-middle-x mb-4 w-75"
            style={{ zIndex: 10 }}
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control border-0 px-4 py-2"
              placeholder="Search for delicious ideas..."
              aria-label="Search"
              style={{ flex: 1 }}
            />
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark rounded-circle p-2"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark rounded-circle p-2"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat != []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3" key={data._id}>
                  <div className="text-white fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItems != []
                    ? foodItems
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filteredItems) => {
                          return (
                            <div
                              key={filteredItems._id}
                              className="col-12 col-md-6 col-lg-3 mx-3"
                            >
                              <Card
                                filteredItems={filteredItems}
                                options={filteredItems.options[0]}
                              />
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Home;
