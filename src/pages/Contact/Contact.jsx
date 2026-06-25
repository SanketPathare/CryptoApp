const contact = () => {
    
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-5">
      <form className="flex flex-col gap-5 px-[2em] pb-[0.4em] bg-[#171717] rounded-[20px] border-2 border-white hover:border-gold transition-colors duration-[2000ms] w-full max-w-[400px] mt-[50px]">
        <p className="text-center m-[1em] text-gold text-[30px] bg-transparent self-center font-semibold">Contact Us </p>
  
        <div className="w-full sm:w-[300px] md:w-[350px] flex items-center justify-center gap-[0.5em] rounded-md p-[0.6em] border-2 border-gold outline-none text-white bg-[#171717] self-center">
          <input required="" placeholder="Name" className="bg-transparent border-none outline-none w-full text-[#ccd6f6] px-[1em] resize-none" type="text" />
        </div>
  
        <div className="w-full sm:w-[300px] md:w-[350px] flex items-center justify-center gap-[0.5em] rounded-md p-[0.6em] border-2 border-gold outline-none text-white bg-[#171717] self-center">
          <input
            required=""
            placeholder="Email"
            className="bg-transparent border-none outline-none w-full text-[#ccd6f6] px-[1em] resize-none"
            type="email"
          />
        </div>
  
        <div className="w-full sm:w-[300px] md:w-[350px] flex items-center justify-center gap-[0.5em] rounded-md p-[0.6em] border-2 border-gold outline-none text-white bg-[#171717] self-center">
          <input
            required=""
            placeholder="Subject"
            className="bg-transparent border-none outline-none w-full text-[#ccd6f6] px-[1em] resize-none"
            type="text"
          />
        </div>
  
        <div className="w-full sm:w-[300px] md:w-[350px] flex items-center justify-center gap-[0.5em] rounded-md p-[0.6em] border-2 border-gold outline-none text-white bg-[#171717] self-center">
          <textarea
            required=""
            placeholder="Message"
            cols="30"
            rows="3"
            className="bg-transparent border-none outline-none w-full text-[#ccd6f6] px-[1em] resize-none"
          ></textarea>
        </div>
  
        <button className="cursor-pointer mb-[3em] p-[1em] rounded-xl border-none outline-none bg-transparent text-gold font-bold ring-1 ring-gold hover:bg-gold hover:text-black transition-all ease-in-out duration-300 w-full sm:w-[300px] md:w-[350px] self-center">Send Message</button>
      </form>
    </div>
  
  )
}

export default contact
