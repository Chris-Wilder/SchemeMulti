import { Link, useParams } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { FileStorage} from '../FileStorage';
import './styles.css';

function ChatRoom() {
    
    const params = useParams();

    const room = chatRooms.find((x) => x.id === params.id);
    if (!room) {
    }

    return (
        <>
            <h2>{room.title}</h2>
            <div>
                <Link to="/">Return to Room List</Link>
            </div>
            <div className="messages-container">
                <MessageList roomId={room.id} />
                <MessageInput roomId={room.id} />
            </div>
            <div className="storage-container">
                <FileStorage roomId={room.id} />
            </div>
        </>
    );
}

export { ChatRoom };
