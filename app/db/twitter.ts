import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

// Twitter API credentials (set via environment variables)
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;
const accessToken = process.env.TWITTER_ACCESS_TOKEN!;
const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET!;

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key) {
    return crypto.createHmac('sha1', key).update(baseString).digest('base64');
  },
});

const token = {
  key: accessToken,
  secret: accessSecret,
};

async function postTweet(content: string) {
  const url = 'https://api.twitter.com/1.1/statuses/update.json';
  const requestData = {
    url,
    method: 'POST',
    data: {
      status: content,
    },
  };

  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authHeader['Authorization'],
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestData.data).toString(),
    });

    const data = await response.json();
    console.log('Tweet posted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

async function deleteTweet(tweetId: string) {
  const url = `https://api.twitter.com/2/tweets/${tweetId}`;
  const requestData = {
    url,
    method: 'DELETE',
  };

  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader['Authorization'],
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Tweet deleted successfully:', data);
    } else {
      console.error('Error deleting tweet:', data);
    }
    return data;
  } catch (error) {
    console.error('Error deleting tweet:', error);
  }
}

export { postTweet, deleteTweet };
