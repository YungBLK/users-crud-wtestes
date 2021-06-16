// packages
import { useCallback, useMemo, useState } from "react";

// parts
import HeaderControlls from "../../components/headerControlls";
import Modal from "../../components/Modal";
import UsersCrudForm from "./items/usersCrudForm";
import Table from "../../components/table";
import { FiEdit2, FiXSquare } from 'react-icons/fi';
// hooks
import { useRetrieveUsers, useRemoveUser } from "../../hooks/users";

// utils
// import { GetUsersColumn } from "./utils";

const Users = () => {
	// hooks
	const removeUser = useRemoveUser();
	const usersList = useRetrieveUsers();

	// states
	const [open, setOpen] = useState(false);
	const [modalType, setModalType] = useState<string>("");

	// effects
	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);


	const openModal = useCallback((type: string) => {
		setModalType(type);
		setOpen(true);
	}, []);


	const columns = useMemo(
		() => [
			{
				Header: "Nome",
				accessor: "firstName",
			},
			{
				Header: "Sobrenome",
				accessor: "lastName",
			},
			{
				Header: "E-mail",
				accessor: "email",
			},
			{
				Header: "Ações",
				Cell: (cell: any) => (
					<div className="btn-group">
						<button className="btn" onClick={() => removeUser(cell.row.original.id)}>
							<FiXSquare />
						</button>
						<button className="btn" onClick={() => openModal("edit")}>
							<FiEdit2 />
						</button>
					</div>
				)
			},
		],
		[openModal]
	);
	return (
		<div className="container">
			<main>
				<div className="pageHeader">
					<h1 className="pageTitle">Usuários</h1>
					<HeaderControlls onCreate={openModal} />
				</div>
				<div>
					<Table data={usersList.users} columns={columns} />
				</div>

				<Modal show={open} handleClose={handleClose}>
					<UsersCrudForm type={modalType}/>
				</Modal>
			</main>
		</div>
	);
};

export default Users;
