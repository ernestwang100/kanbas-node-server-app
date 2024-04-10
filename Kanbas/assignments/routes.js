import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
          (a) => a._id === aid);
        db.assignments[assignmentIndex] = {
          ...db.assignments[assignmentIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
      });
    
    app.post("/api/courses/:mid/assignments", (req, res) => {
        const { mid } = req.params;
        const newAssignment = {
          ...req.body,
          module: mid,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
      });
      
    app.get("/api/courses/:mid/assignments", (req, res) => {
    const { mid } = req.params;
    const assignments = db.assignments
      .filter((a) => a.module === mid);
    res.send(assignments);
  });
}

export default AssignmentRoutes;