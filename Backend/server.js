const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());


app.get('/getCourses', async (req, res) => {
  const canvas_api_token = req.query.canvas_api_token;

  if (!canvas_api_token) {
    return res.status(400).json({ error: 'canvas_api_token is required' });
  }

  try {
    const response = await axios.get(`https://canvas.instructure.com/api/v1/courses/`, {
      params: {
        'access_token': canvas_api_token,
        "per_page": "100"
      },
      headers: {
        'Accept': "application/json+canvas-string-ids"
      }
    });
    var activeCourses = response.data.filter(course => course.enrollments && course.enrollments[0].enrollment_state == "active");
    return res.json(activeCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(200).json({ message: "No courses available" });
  }
});

app.get('/getAssignments', async (req, res) => {
  const canvas_api_token = req.query.canvas_api_token;
  const course_id = req.query.course_id;

  if (!canvas_api_token || !course_id) {
    return res.status(400).json({ error: 'canvas_api_token and course_id are required' });
  }

  try {
    const response = await axios.get(`https://canvas.instructure.com/api/v1/courses/${course_id}/assignments`, {
      params: {
        'access_token': canvas_api_token,
        "per_page": "100"
      },
      headers: {
        'Accept': "application/json+canvas-string-ids"
      }
    });
    const ids = response.data.map(course => course);
    return res.json({ ids });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(200).json({ message: "No assignments available" });
  }
});

app.get('/', async (req, res) => {
  res.status(200).json({ message: "hello!" });
});


app.listen(3500, () => {
  console.log('Server running on port 3500');
});