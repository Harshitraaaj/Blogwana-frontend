import { useSelector } from "react-redux";
import { delet ,get} from "../services/Endpoint";
import toast from "react-hot-toast";
import { useEffect ,useState} from "react";

export default function CustomerMessage() {

    const [contacts, setContacts] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const handleDelete = async (id) => {
        try {
            const request = await delet(`/contact/delete/${id}`);
            const response = request.data;
            console.log(response);
            if (request.status === 200) {
                toast.success(response.message);
            }
            else {
                toast.error("Failed to delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            
        }
    };

    useEffect(() => {
        const contacts = async()=>{
            try {
                const request = await get('/contact/getContact');           
                const response = request.data;
                setContacts(response.contacts);
                console.log(response.contacts);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        }
         contacts();
    }, []);

    return (
        <>
        <div className="container mt-5">
            <h1 className="text-center mb-4 fw-bold">Customer Messages</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
  {contacts.map((contact) => (
    <tr key={contact._id}>
      <td>{contact.userId?.FullName || 'N/A'}</td>
      <td>{contact.userId?.email || 'N/A'}</td>
      <td>{contact.message}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => handleDelete(contact._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
            </div>
        </>
    );
}