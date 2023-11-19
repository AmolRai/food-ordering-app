import { LOGO_URL } from "../utils/constants";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="flex items-center justify-center gap-2 font-bold text-lg">
          <img className="w-20" src={LOGO_URL} />
          <h1>Food Delivery</h1>
        </div>
        <p className="ltd">© 2023 Food Technologies Pvt. Ltd</p>
      </div>

      <div className="footer-info">
        <h1 className="font-medium text-lg">Company</h1>
        <p>About</p>
        <p>Careers</p>
        <p>Team</p>
        <p>Food One</p>
        <p>Food Instamart</p>
        <p>Food Genie</p>
      </div>

      <div className="footer-info">
        <h1 className="font-medium text-lg">Help & Support</h1>
        <p>Partner with us</p>
        <p>Ride with us</p>
        <p>Terms and Conditions</p>
        <p>Cookie Policy</p>
        <p>Privacy Policy</p>
      </div>

      <div className="footer-info">
        <h1 className="font-medium text-lg">We deliver to:</h1>
        <p>Banglore</p>
        <p>Mumbai</p>
        <p>Hyderabad</p>
        <p>Delhi</p>
        <p>Pune</p>
      </div>
    </div>
  );
};

export default Footer;
