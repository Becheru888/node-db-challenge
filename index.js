const express = require('express')
const server = express()
server.use(express.json())

const ProjectData = require('./data/helpers/project-model')
const ActionData = require('./data/helpers/action-models')




/// Projects .. /////

server.get('/api/projects', (req, res) => {
  ProjectData.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: '500 error fetching', err });
    })
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  ProjectData.getWithActions(id)
    .then(action => {
      ProjectData.get(id)
        .then(project => {
          project.actions = action;
          res.status(200).json(project);
        })
        .catch(_ => {
          res.status(404).json({ message: '404 project not found' });
        });
    })
    .catch(err => {
      res.status(500).json({ message: '500 error fetching', err });
    });
});

server.post("/api/projects", async (req, res) => {
  try {
    console.log(req.body)
    const project = await ProjectData.addProject(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({
      error: "Failed to add new project."
    });
  }
});

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  ProjectData.update(id, { name, description })
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} project updated` });
      res.status(404).json({ message: '404 project not found' });
    })
    .catch(err => {
      res.status(500).json({ message: '500 error updating', err });
    })
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  ProjectData.remove(id)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} project deleted` });
      res.status(404).json({ message: '404 project not found' });
    })
    .catch(err => {
      res.status(500).json({ message: '500 error deleting', err });
    });
})


/// Actions ///

server.get('/api/actions', (req, res) => {
  ActionData.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: '500 error fetching', err });
    });
});

server.post('/api/actions', async (req, res) => {
  try{
    const projectData = req.body
    const project = await ActionData.insert(projectData)
    res.status(200).json(project)
  }catch(error){
    res.status(404).json(error)
  }
});

server.put('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  const action = req.body;

  ActionData.update(id, action)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} action updated` });
      res.status(404).json({ message: '404 project not found' });
    })
    .catch(err => {
      res.status(500).json({ message: '500 error updating', err })
    });
});

server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;

  ActionData.remove(id)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} action deleted` });
      res.status(404).json({ message: '404 project not found' });
    })
    .catch(err => {
      res.status(500).json({ message: '500 error updating', err })
    });
});

server.use(express.json());


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});