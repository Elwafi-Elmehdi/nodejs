const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

// Tasks Endpoints

// Get Tasks Endpoint
router.get("/tasks/all", async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (e) {
		res.status(500).send();
	}
});
router.get("/tasks", auth, async (req, res) => {
	const match = {};
	const options = {};
	const sort = {};
	if (req.query.completed) {
		match.completed = req.query.completed === "true";
	}
	if (req.query.sortedBy) {
		const parts = req.query.sortedBy.splite(":");
		sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
		options.sort = sort;
	}
	if (req.query.limit || req.query.skip) {
		options.limit = parseInt(req.query.limit);
		options.skip = parseInt(req.query.skip);
	}
	try {
		//  const tasks = await Task.find({owner:req.user._id})
		await req.user
			.populate({
				path: "tasks",
				match,
				options,
			})
			.execPopulate();
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send();
	}

	//   Task.find({}).then((tasks)=>{
	//   res.status(201).send(tasks)
	//  }).catch((e)=>{
	//   res.status(500).send()
	//  })
});

router.get("/task/:id", auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id: _id, owner: req.user._id });
		if (!task) return res.status(404).send();
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
	//  Task.findById(_id).then((task)=>{
	//   if(!task)
	//    return res.status(404).send()
	//   res.status(201).send(task)
	//  }).catch((e)=>{
	//    res.status(500).send()
	//  })
});

router.post("/tasks", auth, async (req, res) => {
	//  const task = new Task(req.body)
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});
	try {
		const taska = await task.save();
		res.status(201).send(taska);
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}

	//  task.save().then(()=>{
	//   res.status(201).send(task)
	//  }).catch((err)=>[
	//   res.status(400).send(err)
	//  ])
});

// Update Task EndPoint

router.patch("/task/:id", auth, async (req, res) => {
	const inputAttributes = Object.keys(req.body);
	const validUpdates = ["desc", "completed"];
	const isValid = inputAttributes.every((elem) =>
		validUpdates.includes(elem)
	);
	if (!isValid) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}
		inputAttributes.forEach((elem) => {
			task[elem] = req.body[elem];
		});
		await task.save();
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Delete Task EndPoint

router.delete("/task/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndRemove({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) {
			return res.status(404).send({ error: "Task not found!" });
		}
		await task.remove();
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
