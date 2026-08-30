import { useState } from "react";
import { Mail } from "lucide-react";
import { subscribeToNewsletter } from "../../api/newsletter";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="newsletter">
      <div className="container newsletter__inner">
        <h2 className="newsletter__heading">
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <div className="newsletter__input-wrap">
            <Mail size={18} />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary newsletter__btn" disabled={status === "loading"}>
            {status === "success" ? "Subscribed!" : "Subscribe to Newsletter"}
          </button>
        </form>
        {status === "error" && (
          <p className="newsletter__error">Something went wrong, please try again.</p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
