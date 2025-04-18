import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

export default function AddCabinModal() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>

      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  )
}
