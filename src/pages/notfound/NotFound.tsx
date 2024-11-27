import React from "react";
import img404 from "../../assets/404.jpg";

const NotFound = () => {
  return (
    <div className="container-xxl position-absolute top-50 start-50 translate-middle">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <img className="img-fluid" src={img404} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
