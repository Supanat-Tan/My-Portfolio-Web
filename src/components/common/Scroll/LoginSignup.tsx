import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [toggleType, setToggleType] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (toggleType) {
      if (!email || !password) {
        setError("Please fill all inputs");
        return;
      }
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res && res.error) {
          console.error("Error: ", res.error);
          setError("Invalid Credentials");
          return;
        } else {
          console.log("Proceed");
          setEmail("");
          setPassword("");
          setConPassword("");
          setError("");
          setSuccess("Login Successful");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (!toggleType) {
      if (!email || !password || !conPassword) {
        setError("Please fill all inputs");
        return;
      } else if (password !== conPassword) {
        setError("Password don't matched");
        return;
      }
      try {
        const checkUser = await fetch("/api/checkUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        const { user } = await checkUser.json();

        if (user) {
          setError(`Email ${user.email} already exist`);
          return;
        }

        const res = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            conPassword,
          }),
        });

        if (res.ok) {
          if (formRef.current) {
            formRef.current.reset();
          }
          setEmail("");
          setPassword("");
          setConPassword("");
          setError("");
          setSuccess("User registeration successfully");
        } else {
          console.log("User registeration failed");
        }
      } catch (err) {
        console.log("Error registering", err);
      }
    }

    console.log(email, password, conPassword);
  };

  const handleToggle = () => {
    setToggleType((t) => !t);
    setError("");
    setSuccess("");
  };

  return (
    <>
      <div className="w-[100%] h-[100%] flex justify-center items-center flex-col">
        <div className="w-[70%] h-[70%] flex flex-col justify-center items-center ">
          <div
            className="border-2 border-black rounded-lg p-3 cursor-pointer mb-4"
            onClick={handleToggle}
          >
            Toggle {toggleType ? "Login" : "Signup"}
          </div>
          <h3 className="font-bold">
            Please log-in or sign-up to use this feature
          </h3>
          <h3 className="font-bold">
            Please use fake email for now. no valiator
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
            ref={formRef}
          >
            <label className="block mt-4" htmlFor="email">
              Email:
            </label>
            <input
              className="block mt-4 bg-transparent h-[50px] border-black border-2 rounded-lg w-[300px] p-2"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block mt-4" htmlFor="password">
              Password:
            </label>
            <input
              className="block mt-4 bg-transparent h-[50px] border-black border-2 rounded-lg w-[300px] p-2"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!toggleType && (
              <>
                <label className="block mt-4" htmlFor="password">
                  Confirm Password:
                </label>
                <input
                  className="block mt-4 bg-transparent h-[50px] border-black border-2 rounded-lg w-[300px] p-2"
                  type="password"
                  name="con_password"
                  id="con_password"
                  onChange={(e) => setConPassword(e.target.value)}
                />
              </>
            )}
            <button
              type="submit"
              className="mt-4 border-2 border-black p-2 rounded-lg w-20 "
            >
              {toggleType ? "Login" : "Signup"}
            </button>
          </form>
          {error && (
            <div className="bg-red-600 text-red-200 rounded-lg mt-4 p-2">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-green-200 rounded-lg mt-4 p-2">
              {success}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
