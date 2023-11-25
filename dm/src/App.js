import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const MagazineIssue = ({ issueNumber }) => {
  // Fetch magazine content from API
  const [magazineContent, setMagazineContent] = React.useState(null);

  React.useEffect(() => {
    const fetchMagazineContent = async () => {
      const response = await fetch(`https://api.example.com/magazines/${issueNumber}`);
      const data = await response.json();
      setMagazineContent(data);
    };

    fetchMagazineContent();
  }, [issueNumber]);

  if (!magazineContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{magazineContent.title}</h1>
      <p>{magazineContent.description}</p>
      <ul>
        {magazineContent.articles.map((article) => (
          <li key={article.id}>
            <Link to={`/magazines/${issueNumber}/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MagazineArticle = ({ issueNumber, articleId }) => {
  // Fetch article content from API
  const [articleContent, setArticleContent] = React.useState(null);

  React.useEffect(() => {
    const fetchArticleContent = async () => {
      const response = await fetch(`https://api.example.com/magazines/${issueNumber}/articles/${articleId}`);
      const data = await response.json();
      setArticleContent(data);
    };

    fetchArticleContent();
  }, [issueNumber, articleId]);

  if (!articleContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{articleContent.title}</h1>
      <p>{articleContent.content}</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/magazines/:issueNumber">
          <MagazineIssue />
        </Route>
        <Route path="/magazines/:issueNumber/articles/:articleId">
          <MagazineArticle />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;