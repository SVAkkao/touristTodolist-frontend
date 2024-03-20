// react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
// Fontawesome
import { FaTrashCan, FaPen, FaClockRotateLeft } from "react-icons/fa6";
// Local
import CommentForm from "./CommentForm";
import { modal_modules, modal_mode_modules } from "./utils";
import { change_comment_api, delete_comment_api, get_comment_changelog_api } from "./api";
import { useEffect, useState } from "react";

function DeleteConfirmModal({ hideModal, iid }) {
    const close = () => {
        console.log(iid);
        hideModal();
    };
    return (<div>
        <p>您確定要刪除嗎？<strong className="allcaps">此操作無法撤銷</strong>！</p>
        <ButtonGroup aria-label="Basic example">
            <Button onClick={close} variant="danger">刪除</Button>
            <Button onClick={close} variant="secondary">取消</Button>
        </ButtonGroup>
    </div>);
}

function ChangelogList({ cid, closeChangelog }) {
    const [changelogs, set_changelogs] = useState([]);
    useEffect(() => {
        get_comment_changelog_api(cid).then( response => {
            set_changelogs(response.result);
        });
    }, [cid]);
    function TableRows({ changelogs }) {
        if( changelogs.length < 1 ) {
            return  <tr>
                <td colSpan={3} className="text-center">No changes</td>
            </tr>
        }
        return changelogs.map((its) => <tr key={its.id}>
            <td>
                <time dateTime={its.created_at}>{its.created_at}</time>
            </td>
            <td>{its.before}</td>
            <td>{its.after}</td>
        </tr>);
    }
    return <div className="changelog-list">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Changed date</th>
                    <th>Before</th>
                    <th>After</th>
                </tr>
            </thead>
            <tbody>
                <TableRows changelogs={changelogs} />
            </tbody>
        </Table>
    </div>;
}

export default function OprationPanel({ pid, cid, onDelete, onEdit, preloadDatas }) {
    const { show, close_modal, show_modal } = modal_modules();
    const modalmode = modal_mode_modules();
    // Removing actions
    function RemoveForm({ modalmode, closeRemoving }) {
        const can_remove = modalmode.mode === modalmode.REMOVING;
        return can_remove ? <DeleteConfirmModal hideModal={closeRemoving} /> : <div></div>;
    }
    const open_removing = () => {
        modalmode.set_mode(modalmode.REMOVING);
        show_modal();
    };
    const close_removing = () => {
        const ajax = delete_comment_api(cid);
        ajax.then( (response) => {
            console.log(response);
            onDelete();
            close_modal();
        }).catch( (response) => {
            console.error(response);
            alert(response.message);
        });
    };
    // Editing actions
    function EditForm({ modalmode, pid, closeEditing, preloadDatas }) {
        const can_edit = modalmode.mode === modalmode.EDITING;
        return can_edit ? <CommentForm pid={pid} submitAction={closeEditing} preloadDatas={preloadDatas} method="PUT" /> : <div></div>;
    }
    const open_editing = () => {
        modalmode.set_mode(modalmode.EDITING);
        show_modal();
    };
    const close_editing = (form_dom) => {
        const ajax = change_comment_api(form_dom, cid);
        ajax.then( (response) => {
            console.log(response);
            onEdit();
            close_modal();
        }).catch( (response) => {
            console.error(response);
            alert(response.message);
        });
    };
    // Changelog actions
    function ChangelogForm({ modalmode, cid, closeChangelog }) {
        const can_log = modalmode.mode === modalmode.CHANGELOG;
        return can_log ? <ChangelogList cid={cid} closeChangelog={closeChangelog} /> : <div></div>;
    }
    const open_changelog = () => {
        modalmode.set_mode(modalmode.CHANGELOG);
        show_modal();
    };
    const close_changelog = () => {
        close_modal();
    };
    // HTML
    const ModalTitle = ({ modalmode }) => {
        switch (modalmode.mode) {
            case modalmode.EDITING: return "編輯";
            case modalmode.REMOVING: return "刪除";
            case modalmode.CHANGELOG: return "修改記錄";
            default: return "不明";
        }
    };
    return <div className="item-panel">
        <FaTrashCan className="click-icon" onClick={open_removing} />
        <FaPen className="click-icon" onClick={open_editing} />
        <FaClockRotateLeft className="click-icon" onClick={open_changelog} />
        <div className="modals">
            <Modal id="edit-form-modal" size="xs" centered show={show} onHide={close_modal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <ModalTitle modalmode={modalmode} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RemoveForm modalmode={modalmode} closeRemoving={close_removing} />
                    <EditForm modalmode={modalmode} pid={pid} preloadDatas={preloadDatas} closeEditing={close_editing} />
                    <ChangelogForm modalmode={modalmode} cid={cid} closeChangelog={close_changelog} />
                </Modal.Body>
            </Modal>
        </div>
    </div>;
}
