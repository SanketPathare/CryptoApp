import "./contact.css";
export const contact = () => {
  return (
    <div>
      <div className="form-container">
        <form className="form">
          <div className="form-group">
            <label>Company Email</label>
            <input required="" name="email" id="email" type="text" />
          </div>
          <div className="form-group">
            <label>How Can We Help You?</label>
            <textarea
              required=""
              cols="50"
              rows="10"
              id="textarea"
              name="textarea"
            >
            </textarea>
          </div>
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
