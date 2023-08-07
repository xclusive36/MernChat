import AddChatroom from "../components/AddChatroom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="container is-fluid">
        <div className="page-title">Welcome to MernChat!</div>
        <div className="page-subtitle">
          A place to chat with your friends and family
        </div>
        <div className="add-chatroom">
          <AddChatroom />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
