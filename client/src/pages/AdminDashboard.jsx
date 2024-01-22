import React, { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    PersonAdd,
    LibraryAdd,
    HowToReg,
    Person,
    ExitToApp,
    Group,
    LibraryBooks,
} from "@material-ui/icons";
import { useSpring, animated, config } from "react-spring";
import { AnnouncementPanel } from "./Announcement/AnnouncementPanel";
import { EventPanel } from "./Event/EventPanel";

const Container = styled.div`
    display: flex;
    height: 100%;
    max-width: 100vw;
    width: 100%;
    background-color: white;
`;

const SubContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-inline: 1rem;
`;

const Header = styled.div`
    display: flex;
    width: 18vw;
    max-width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 20px 5px #888888;
    border-radius: 40px;
    padding-top: 1.7rem;
    padding-bottom: 1.7rem;
    > h1 {
        // font:500 2.2vmax;
        font-size: 1.5rem;
        color: #0077b6;
        // transform:translateX(-10vmax) translateY(-2vmax)
    }
    > img {
        width: 5vmax;
        height: 5vmax;
        object-fit: contain;
        border-radius: 100%;
        transition: all 0.5s;
    }
    > a {
        border-radius: 10px;
        background-color: #0077b6;
        font: 400 1vmax;
        color: white;
        text-decoration: none;
        padding: 0.5vmax;
        width: 30%;
        // margin: 4vmax;
        margin-top: 0.5rem;
        text-align: center;
        transition: all 0.5s;
    }
`;

const HeaderOne = styled.div`
    display: flex;
    width: 18vw;
    max-width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    box-shadow: -5px -5px 30px -5px inset #888888;
    padding-top: 1rem;
    padding-bottom: 1rem;
    > h1 {
        // font:500 2.2vmax;
        font-size: 1.5rem;
        color: #0077b6;
        // transform:translateX(-10vmax) translateY(-2vmax)
    }
    > img {
        width: 5vmax;
        height: 5vmax;
        object-fit: contain;
        border-radius: 100%;
        transition: all 0.5s;
    }
    > a {
        border-radius: 10px;
        background-color: #0077b6;
        font: 400 1vmax;
        color: white;
        text-decoration: none;
        padding: 0.5vmax;
        width: 30%;
        // margin: 4vmax;
        margin-top: 0.5rem;
        text-align: center;
        transition: all 0.5s;
    }
`;

const MenuItem = styled.div`
    padding: 0.4rem;
    width: 18rem;
    margin-bottom: 0.4rem;
    border-radius: 10px;
    display: flex;
    // display: inline-block;
    flex-direction: row;
    justify-content: space-betweeen;
    gap: 1rem;
    align-items: center;
    > h1 {
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
    }

    &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    border-radius: 20px;
    flex-direction: row;
    // justify-content: space-between;
    gap: 100px;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 20px 5px #888888;
`;

const ProfileInfoItem = styled.div`
    justify-content: space-evenly;
    align-items: center;
    padding: 1.3vmax;
    box-sizing: border-box;
    // border-bottom: 0.5px solid #0077b6;
    > h4 {
        color: #0077b6;
        // font:400 1.2vmax;
        font-size: 1.3rem;
        text-align: center;
    }
    > p {
        color: black;
        // font:400 1vmax;
        font-weight: 400;
        font-size: 1.1rem;
        // margin: 0.2vmax;
        text-align: center;
    }
`;

const ProfileContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    width: 80vw;
    max-width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-inline: 1rem;
`;

const NoticeContainer = styled.div`
    border: 1px solid #272727;
    border-radius: 20px;
`;

const NoticeBar = styled.div`
    > h4 {
        margin: 0;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 20px;
        font-size: 1.3rem;
        color: #0077b6;
        background-color: #9bedff;
    }
`;

const NoticeContent = styled.div`
    > p {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
    }
`;

const AdminDashboard = () => {
    const admin = useSelector((state) => state.admin);
    const navigate = useNavigate();

    const AddStudent = () => {
        navigate("/admin/add/students");
    };

    const AddFaculty = () => {
        navigate("/admin/add/faculties");
    };

    const AddSubject = () => {
        navigate("/admin/add/subjects");
    };

    const GetStudent = () => {
        navigate("/admin/students");
    };

    const GetFaculty = () => {
        navigate("/admin/faculties");
    };

    const GetSubject = () => {
        navigate("/admin/subjects");
    };

    useEffect(() => {
        if (!admin.isAuthenticated) {
            navigate("/admin/login");
        }
    }, [admin.isAuthenticated]);

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 300 },
    });

    return (
        <>
            {admin.isAuthenticated ? (
                <>
                    <AdminNavbar />
                    <Container>
                        <SubContainer style={fadeIn}>
                            <Header>
                                <h1>College Admin Profile</h1>
                                <img src={admin.admin.avatar.url} />
                                <h3>{admin.admin.name}</h3>
                                <h3>{admin.admin.registrationNumber}</h3>
                                <Link to="/admin">Welcome</Link>
                            </Header>
                            <HeaderOne>
                                <MenuItem onClick={AddStudent}>
                                    <PersonAdd style={{ color: "#0077b6" }} />
                                    <h1>Add Student</h1>
                                </MenuItem>
                                <MenuItem onClick={AddFaculty}>
                                    <HowToReg style={{ color: "#0077b6" }} />
                                    <h1>Add Faculty</h1>
                                </MenuItem>
                                <MenuItem onClick={AddSubject}>
                                    <LibraryAdd style={{ color: "#0077b6" }} />
                                    <h1>Add Subject</h1>
                                </MenuItem>
                                <MenuItem onClick={GetStudent}>
                                    <Person style={{ color: "#0077b6" }} />
                                    <h1>Search Students</h1>
                                </MenuItem>
                                <MenuItem onClick={GetFaculty}>
                                    <Group style={{ color: "#0077b6" }} />
                                    <h1>Search Faculty</h1>
                                </MenuItem>
                                <MenuItem onClick={GetSubject}>
                                    <LibraryBooks
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Search Subject</h1>
                                </MenuItem>
                            </HeaderOne>
                        </SubContainer>
                        <ProfileContainer style={fadeIn}>
                            <ProfileInfo>
                                <ProfileInfoItem>
                                    <h4>Email</h4>
                                    <p>{admin.admin.email}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Department</h4>
                                    <p>{admin.admin.department}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Contact Number</h4>
                                    <p>{admin.admin.contactNumber}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Joining Year</h4>
                                    <p>{admin.admin.joiningYear}</p>
                                </ProfileInfoItem>
                            </ProfileInfo>
                            <NoticeContainer>
                                <NoticeBar>
                                    <h4>Announcements</h4>
                                </NoticeBar>
                                <NoticeContent>
                                    <AnnouncementPanel />
                                </NoticeContent>
                            </NoticeContainer>
                            <NoticeContainer>
                                <NoticeBar>
                                    <h4>Events</h4>
                                </NoticeBar>
                                <NoticeContent>
                                    <EventPanel />
                                </NoticeContent>
                            </NoticeContainer>
                        </ProfileContainer>
                    </Container>
                </>
            ) : null}
        </>
    );
};

export default AdminDashboard;
