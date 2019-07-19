const express = require('express')
const server = express()

const projectData = require('./data/helpers/project-model')
const actionData = require('./data/helpers/action-models')




server.get('/api/projects', (req, res) => {
  projectData.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: '500 error fetching', err });
    })
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectData.getWithActions(id)
    .then(action => {
      projectData.get(id)
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

server.post('/api/projects', async (req, res) => {
  const projectDatas = req.body;
try{
    const project = await projectData.addProject(projectDatas)
    res.status(201).json(project)
  }catch(error){
    res.status(500).json('Failed to create project')
  }
});

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  projectData.update(id, { name, description })
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

  projectData.remove(id)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} project deleted` });
      res.status(404).json({ message: '404 project not found' });
    })
    .catch(err => {
      res.status(500).json({ message: '500 error deleting', err });
    });
})

server.use(express.json());


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});