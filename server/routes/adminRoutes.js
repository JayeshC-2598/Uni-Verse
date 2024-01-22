const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    adminLogin,
    addFaculty,
    addStudent,
    addSubject,
    addAdmin,
    getAllFaculty,
    getAllStudents,
    getAllSubjects,
    getFaculty,
    getStudents,
    getSubjects,
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    getEvents,
    createEvent,
    deleteEvent,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.post("/addAdmin", addAdmin);
router.post(
    "/addFaculty",
    passport.authenticate("jwt", { session: false }),
    addFaculty
);
router.post(
    "/addStudent",
    passport.authenticate("jwt", { session: false }),
    addStudent
);
router.post(
    "/addSubject",
    passport.authenticate("jwt", { session: false }),
    addSubject
);
router.post(
    "/getAllFaculty",
    passport.authenticate("jwt", { session: false }),
    getAllFaculty
);
router.post(
    "/getAllStudent",
    passport.authenticate("jwt", { session: false }),
    getAllStudents
);
router.post(
    "/getAllSubject",
    passport.authenticate("jwt", { session: false }),
    getAllSubjects
);
router.post(
    "/getFaculties",
    passport.authenticate("jwt", { session: false }),
    getFaculty
);
router.post(
    "/getStudents",
    passport.authenticate("jwt", { session: false }),
    getStudents
);
router.post(
    "/getSubjects",
    passport.authenticate("jwt", { session: false }),
    getSubjects
);

const announcementRouter = express.Router();

announcementRouter
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        getAnnouncements
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        createAnnouncement
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        deleteAnnouncement
    );

router.use("/announcements", announcementRouter);

const eventRouter = express.Router();

eventRouter
    .get("/", passport.authenticate("jwt", { session: false }), getEvents)
    .post("/", passport.authenticate("jwt", { session: false }), createEvent)
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        deleteEvent
    );

router.use("/events", eventRouter);

module.exports = router;
