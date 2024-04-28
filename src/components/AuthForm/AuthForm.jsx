import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import createUser from "../../utils/authentication/signup";
import loginUser from "../../utils/authentication/login";
import { useEffect } from "react";

const inputs = [
  ["text", "username"],
  ["email", "email"],
  ["password", "password"],
];

export default function AuthForm() {
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const { isPending, isSuccess, isError, error, data, mutate, reset } =
    useMutation({
      mutationKey: ["signup"],
      mutationFn: handleSubmit,
    });

  useEffect(() => {
    reset();
  }, [location]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const response =
      currentPage == "signin"
        ? await loginUser(email, password)
        : await createUser(email, password, username);

    const redirect = location?.state?.redirect;
    if (redirect) navigate(redirect);

    return response;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {["signin", "signup"].map((item, index) => (
        <div
          key={index}
          className="relative grow max-w-[500px] bg-lighter p-10 space-y-8"
        >
          <AreaCover
            scaling={item == currentPage ? "scale-y-0 " : "scale-y-100 "}
            page={item}
          />
          <PageTitle page={item} />
          {isError && (
            <p className="text-xs text-center text-red-600">{error.message}</p>
          )}
          {isSuccess && (
            <p className="text-xs text-center text-green-600">{data}</p>
          )}
          <PageSubtext page={item} />
          <form onSubmit={mutate} className="flex flex-col items-center gap-1">
            {inputs.map(([inputType, inputPlacesholder], index) => (
              <input
                key={index}
                type={inputType}
                name={inputPlacesholder}
                placeholder={inputPlacesholder}
                className=" w-[90%] h-14 bg-dark rounded-md pl-3"
                required={
                  item == "signup" && inputPlacesholder == "username"
                    ? true
                    : false
                }
                hidden={
                  item == "signin" && inputPlacesholder == "username"
                    ? true
                    : false
                }
              />
            ))}
            <button
              disabled={isPending ? true : false}
              className=" w-[90%] h-14 bg-darker text-white font-semibold text-lg rounded-md pl-3 disabled:opacity-65"
            >
              Submit
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

const PageTitle = ({ page }) => (
  <h1 className="text-center text-5xl capitalize font-orelega-one">
    {page == "signin" ? "login" : page}
  </h1>
);

const PageSubtext = ({ page }) => {
  const loginText = `En vous connectant à votre compte, votre
 parcours d’achat sera plus rapide`;
  const signupText = `Créez votre compte maintenant et gagnez du temps pour
vos prochaines commandes`;

  return (
    <p className="text-center text-sm text-cl-gray">
      {page == "signin" ? loginText : signupText}
    </p>
  );
};

const Form = ({ page, submitForm }) => {
  const inputs = [
    ["text", "username"],
    ["email", "email"],
    ["password", "password"],
  ];
  return (
    <form onSubmit={submitForm} className="flex flex-col items-center gap-1">
      {inputs.map(([inputType, inputPlacesholder], index) => (
        <input
          key={index}
          type={inputType}
          name={inputPlacesholder}
          placeholder={inputPlacesholder}
          className=" w-[90%] h-14 bg-dark rounded-md pl-3"
          hidden={
            page == "signin" && inputPlacesholder == "username" ? true : false
          }
        />
      ))}
      <button className=" w-[90%] h-14 bg-darker text-white font-semibold text-lg rounded-md pl-3">
        Submit
      </button>
    </form>
  );
};

const AreaCover = ({ scaling, page }) => {
  const loginQuestion = "vous avez déjà un compte?";
  const signupQuestion = "vous n'avez pas de compte?";
  const loginAdv = `En vous connectant à votre compte, votre
 parcours d’achat sera plus rapide`;
  const signupAdv = `Créez votre compte maintenant et gagnez du temps pour
vos prochaines commandes`;
  return (
    <Link
      to={`/auth/${page}`}
      className={`absolute z-40 top-0 left-0 w-full h-full bg-darker
  ${scaling} flex flex-col items-center justify-center text-white rounded-md px-10 gap-11 origin-top transition-all duration-300
  `}
    >
      <p className=" font-light">
        {page == "signin" ? loginQuestion : signupQuestion}
      </p>
      <h1 className=" text-7xl font-orelega-one capitalize">
        {page == "signin" ? "login" : page}
      </h1>
      <p className=" text-center font-light">
        {page == "signin" ? loginAdv : signupAdv}
      </p>
    </Link>
  );
};
