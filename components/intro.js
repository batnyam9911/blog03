import { Media, Image } from "react-bootstrap";

export default () => (
  <Media className="mb-4 admin-intro">
    <Image
      roundedCircle
      width={64}
      height={64}
      className="mr-3"
      src="logo.jpg"
      alt="Generic placeholder"
    />
    <Media.Body>
      <h5 className="font-weight-bold mb-0">ХӨВСГӨЛ ЗАР</h5>
      <p className="welcome-text">
        Хөвсгөлийн анхны зарын сайт.
      </p>
    </Media.Body>
  </Media>
);
