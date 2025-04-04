import { useState } from "react";

const useFeedback = (googleScriptUrl) => {
  const [Feedbacks, setFeedbacks] = useState([]);
  const [Email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email && description) {
      try {
        const queryParams = new URLSearchParams({
          email: Email,
          feedback: description,
        }).toString();

        const response = await fetch(`${googleScriptUrl}?${queryParams}`, {
          method: "GET",
        });
        console.log("shit");
        console.log(response.status);
        const result = await response.json();
        console.log(result);

        if (response.status === 200) {
          setFeedbacks([...Feedbacks, { Email, description }]);
          setStatus("Feedback submitted successfully!");
          setEmail("");
          setDescription("");
        } else {
          setStatus("Failed to submit feedback.");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setStatus("Error submitting feedback.");
      }
    } else {
      setStatus("Please fill out both fields.");
    }
  };

  return {
    Feedbacks,
    Email,
    description,
    status,
    setEmail,
    setDescription,
    handleSubmit,
  };
};

export default useFeedback;
