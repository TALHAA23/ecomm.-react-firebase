import { Link } from "react-router-dom";
import Line from "../Line";
const contact = [
  "Grain du sud Route de Taniour, Km 11 Sfax, Tunisie",
  "+216 28 997 773",
];
const pages = [
  "services",
  "nos nutritions",
  "nos Poussins",
  "boutique",
  "nos poulets",
  "contact",
];

const quickLinks = [
  <Link to="form/address-form">nouvelle adresse</Link>,
  <Link to="profile/notifications">Notifications</Link>,
  <Link to="profile/Mescommandes">Mescommandes</Link>,
];

export default function Footer() {
  return (
    <footer className="relative w-full h-full bg-[#68686828] py-4 px-8">
      <h1 className=" font-orelega-one text-5xl text-cl-darker my-10">
        GRAIN DU SUD
      </h1>
      <Line />
      <div className="flex gap-10">
        <FooterList listTitle="Contact" listItems={contact} />
        <FooterList
          listTitle="Pages"
          listItems={pages.map((page) => (
            <Link to={page.split(" ").join("")}>{page}</Link>
          ))}
        />
        <FooterList listTitle="Liens rapides" listItems={quickLinks} />
      </div>
      <SocialMediaLinks />
      <Line />
      <small>All rights reserved</small>
    </footer>
  );
}

const FooterList = ({ listTitle, listItems }) => (
  <div className="max-w-[200px]">
    <h1 className=" font-semibold text-lg border-b-2 border-gray-400">
      {listTitle}
    </h1>
    <ul className=" ml-2 space-y-1">
      {listItems.map((item, index) => (
        <li key={index} className="text-cl-gray text-sm">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const SocialMediaLinks = () => (
  <div className=" absolute right-2 top-1/2 -translate-y-1/2">
    {["facebook-svgrepo-com (2).svg", "whatsapp-svgrepo-com 1.svg"].map(
      (item, index) => (
        <Link key={index}>
          <img src={`/icons/${item}`} alt="img" width="30px" />
        </Link>
      )
    )}
  </div>
);
