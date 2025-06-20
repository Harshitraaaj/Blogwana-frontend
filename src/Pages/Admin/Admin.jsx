import React, { useEffect, useState } from 'react';
import { get } from '../../services/Endpoint';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Legend, Bar, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function Admin() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const request = await get('/dashboard');
        const response = request.data;

        if (request.status === 200) {
          setPost(response.Posts);
          setUsers(response.Users);
          setComments(response.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    GetData();
  }, []);




  const pieData = [
    { name: 'Users', value: users.length },
    { name: 'Posts', value: post.length },
    { name: 'Comments', value: comments.length },
  ];

  const barData = pieData;

  return (
    <div>
      


      {/* Charts Section */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">User / Post / Comment Distribution</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Total Count Overview</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-white">Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Posts</h5>
              <p className="card-text">{post.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Comments</h5>
              <p className="card-text">{comments.length}</p>
            </div>
          </div>
        </div>
      </div>
      

    </div>


  );
}
