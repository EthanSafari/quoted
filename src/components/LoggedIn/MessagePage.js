import Messages from "../Homepage/Messages";
import Footer from "../Homepage/Footer";

export default function MessagePage({ messageData }) {
    return (
        <>
            <Messages messageData={messageData}/>
            <Footer />
        </>
    )
};
