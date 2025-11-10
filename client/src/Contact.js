import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (<>
    <Header />
    <Wrapper>
      <h3 className="common-heading">Contact us</h3>
      <iframe
      title="myFrame"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8042365425017!2d72.80910541462518!3d21.160187585927286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e016aaaaaa9%3A0xace6862649e8612b!2sToshal%20Infotech!5e0!3m2!1sen!2sin!4v1678698012309!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/mnqyzzeq" method="POST" className="contact-inputs">
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols={30}
              rows={10}
              required
                autoComplete="off"
                placeholder="Enter your Message"
            />

            <input type="submit" value="send" />

          </form>
        </div>
      </div>
    </Wrapper>
      <Footer />
    </>
  );
};

export default Contact;
