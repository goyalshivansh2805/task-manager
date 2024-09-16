import { FaCheckCircle, FaSpinner, FaHourglassHalf } from 'react-icons/fa';

function TaskStatus({ status }) {
  
  const getStatusIcon = () => {
    switch (status) {
      case 'Pending':
        return <FaHourglassHalf className="text-yellow-500" size={40}/>; 
      case 'Progress':
        return <FaSpinner className="text-blue-500" size={40}/>;         
      case 'Completed':
        return <FaCheckCircle className="text-green-500" size={40}/>;   
      default:
        return <FaHourglassHalf className="text-gray-400" size={40}/>;   
    }
  };

  return (
    <div className="flex items-center absolute top-10 left-[530px]">

      {getStatusIcon()}
    </div>
  );
}

export default TaskStatus;
