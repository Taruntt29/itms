import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const CustomErrorPage = (props) => {
  return (
    <div className="w-100 h-100 bg-white d-flex align-items-center">
      <Image src="/404.jpeg" alt="Something went wrong." />
    </div>
  );
};

CustomErrorPage.propTypes = {};

export default CustomErrorPage;
