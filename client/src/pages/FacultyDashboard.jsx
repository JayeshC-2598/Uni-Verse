import React from "react";
import { useSelector } from "react-redux";
import FacultyNavbar from "../components/FacultyNavbar";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
    Person,
    Dashboard,
    Ballot,
    VpnKey,
    Group,
    Chat,
    Search,
} from "@material-ui/icons";
import { AnnouncementPanel } from "./Announcement/AnnouncementPanel";
import { EventPanel } from "./Event/EventPanel";
import { useSpring, animated, config } from "react-spring";

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100vw;
    max-width: 100%;
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

    a:hover {
        background-color: #c0dbeb;
        color: #101010;
        cursor: pointer;
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
    margin-bottom: 0.4rem;
    width: 18rem;
    border-radius: 10px;
    display: flex;
    // display: inline-block;
    flex-direction: row;
    justify-content: space-betweeen;
    gap: 1rem;
    align-items: center;

    &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }

    > h1 {
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
    }
`;

const Item = styled.div``;

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

const ProfileInfo = styled.div`
    display: flex;
    border-radius: 20px;
    flex-direction: row;
    // justify-content: space-between;
    justify-content: center;
    gap: 8rem;
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

const FacultyDashboard = () => {
    const navigate = useNavigate();
    const faculty = useSelector((store) => store.faculty);

    const home = () => {
        navigate("/faculty");
    };

    const updateProfile = () => {
        navigate("/faculty/update");
    };

    const updatePassword = () => {
        navigate("/faculty/updatePassword");
    };

    const marksList = () => {
        navigate("/faculty/marks");
    };

    const attendance = () => {
        navigate("/faculty/attendance");
    };

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 },
    });

    return (
        <>
            {faculty.isAuthenticated ? (
                <>
                    <FacultyNavbar />
                    <Container>
                        <SubContainer style={fadeIn}>
                            <Header>
                                <h1>Faculty Profile</h1>
                                <img src={faculty.faculty.faculty.avatar.url} />
                                <h3>{faculty.faculty.faculty.name}</h3>
                                <h3>
                                    {faculty.faculty.faculty.registrationNumber}
                                </h3>
                                <Link to="/faculty/update">Update Profile</Link>
                            </Header>
                            <HeaderOne>
                                <MenuItem onClick={updateProfile}>
                                    <Person
                                        onClick={updateProfile}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Update Profile</h1>
                                </MenuItem>
                                <MenuItem onClick={updatePassword}>
                                    <VpnKey
                                        onClick={updatePassword}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Update Password</h1>
                                </MenuItem>
                                <MenuItem onClick={attendance}>
                                    <Group
                                        onClick={attendance}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Attendance</h1>
                                </MenuItem>
                                <MenuItem onClick={marksList}>
                                    <Ballot
                                        onClick={marksList}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Marks List</h1>
                                </MenuItem>
                            </HeaderOne>
                        </SubContainer>
                        <ProfileContainer style={fadeIn}>
                            <ProfileInfo>
                                <ProfileInfoItem>
                                    <h4>Email</h4>
                                    <p>{faculty.faculty.faculty.email}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Designation</h4>
                                    <p>{faculty.faculty.faculty.designation}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Mobile Number</h4>
                                    <p>
                                        {
                                            faculty.faculty.faculty
                                                .facultyMobileNumber
                                        }
                                    </p>
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
            ) : (
                navigate("/")
            )}
        </>
    );
};

export default FacultyDashboard;
