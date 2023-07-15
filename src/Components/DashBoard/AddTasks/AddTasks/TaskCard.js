import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./TaskCard.css";
const TaskCard = ({ data, deleteHandler, onEditClickHandler }) => {
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>{data.note}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <DeleteOutlined
          onClick={() => {
            deleteHandler(data);
          }}
          style={{ fontSize: "20px", marginRight: "20px", color: " #ED2939" }}
        />
        <EditOutlined onClick={() => onEditClickHandler(data)} style={{ fontSize: "20px", color: "#00CED1" }} />
      </div>
    </div>
  );
};

export default TaskCard;
