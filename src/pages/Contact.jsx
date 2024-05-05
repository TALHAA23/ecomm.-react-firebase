import emailjs from "@emailjs/browser";
export default function Contact() {
  return (
    <div className=" pt-36">
      <div className="w-[90%] max-w-[500px] mx-auto flex flex-col justify-center">
        <h1 className=" text-cl-darker font-orelega-one text-6xl text-center">
          CONTACT
        </h1>
        <div className=" relative text-red-700">
          <p className=" p-5 bg-lighter text-cl-darker my-5 rounded-lg">
            Nous sommes là pour vous aider. Contactez-nous par téléphone, email
            ou via notre formulaire en ligne. Notre équipe est prête à répondre
            à vos questions et à discuter de vos besoins en élevage.
            Visitez-nous aussi sur nos réseaux sociaux pour rester connecté avec
            la communauté Grain du sud
          </p>
          <img
            src="/icons/mail-reception-svgrepo-com-green.svg"
            alt="mail-icon"
            className=" w-40 absolute -top-20 -right-20"
          />
          <img
            src="/icons/phone-flip-svgrepo-com-green.svg"
            alt="mail-icon"
            className=" w-40 absolute bottom-0  -left-32"
          />
        </div>
      </div>
      <ContactForm />
    </div>
  );
}

const ContactForm = () => {
  //
  const handleSubmit = (e) => {
    console.log("hi");
    e.preventDefault();

    emailjs
      .sendForm("service_a6icfh9", "template_ern582h", e.target, {
        publicKey: "JjbBGjEJlqBzQd9Bm",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  //
  return (
    <div className="bg-lighter rounded-lg p-7 m-10">
      <div className="w-1/2">
        <h1 className="text-cl-darker font-orelega-one text-4xl my-4 capitalize">
          entrer en contact
        </h1>
        <div className=" flex items-center">
          <img
            src="/icons/location-pin-alt-svgrepo-com.svg"
            alt=""
            className=" w-7"
          />
          <p className=" text-cl-gray">
            Grain du sud, Route de Taniour, Km 11 Sfax, Tunisie
          </p>
        </div>
        <div className=" flex items-center">
          <img
            src="/icons/phone-flip-svgrepo-com.svg"
            alt=""
            className=" w-7"
          />
          <p className=" text-cl-gray">+216 28 997 773</p>
        </div>
        <h3 className="relative text-cl-gray text-center my-4 before:w-[47%] before:absolute before:h-[2px] before:bg-lime-900 before:left-0 before:top-1/2  after:absolute after:w-[47%] after:h-[2px] after:bg-lime-900 after:-right-0 after:top-1/2">
          or
        </h3>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-2 px-4">
          {["name", "email"].map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={item}
              className=" w-full bg-dark h-12 rounded pl-2 text-sm"
            />
          ))}
          <textarea
            name="message"
            cols="20"
            rows="4"
            placeholder="Tell us what's is your mind"
            className=" resize-none focus:outline-none bg-dark p-2 text-sm"
          ></textarea>
          <button className=" px-7 py-2 text-white font-bold  bg-darker w-fit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
