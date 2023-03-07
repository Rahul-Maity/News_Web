import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    // country: 'in',
    pageSize: 8,
    category:'general'//everything is class based . To know difference between class based and function based refer to harry bhai github🙄
  }
  static propTypes = {
    // country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `Newsmonkey - ${this.props.category}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8141d4fb5bef4062b91ce9bd7fd8194a&page=1&pageSize=${this.props.pageSize}`;

    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    
    this.setState({ page: 1 }, () => {
      this.updateNews();
    })
  }
  // handlenextclick = async () => {
    
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      
    
      
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8141d4fb5bef4062b91ce9bd7fd8194a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({ loading: true });
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   console.log(parsedData);
     
  
  
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles:parsedData.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   this.setState({ page: this.state.page +1 }, () => {
      
  //     this.updateNews();
  //   })

  // }
  // handleprevclick = async() => {
  //   // console.log("prev");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8141d4fb5bef4062b91ce9bd7fd8194a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
   


  //   // this.setState({
  //   //   loading: false,
  //   //   page: this.state.page - 1,
  //   //   articles:parsedData.articles
  //   // })

  //   this.setState({ page: this.state.page - 1 }, () => {
      
  //     this.updateNews();
  //   })
  
  // }


  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    
    this.setState({ page: this.state.page + 1 });
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };


  render() {
    return (
      <>
      
        <h2 className="text-center" style={{marginTop:'70px'}}>Newsmonkey - Top Headlines on <strong classname="text-primary " >{this.props.category}</strong></h2>
        {/* loading part-> */}
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">

        {this.state.articles.map((element) => {
          return    <div className="col-md-4"   key={element.url}>
            <Newsitem
           
              title={element.title.slice(0,44)}
              description={element.description==null?"No description available for this post":element.description.slice(0,88)}
              imageurl={ element.urlToImage==null?"https://www.educationalappstore.com/images/english-newspaper-apps.jpg":element.urlToImage } newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
            />
          </div>
        })}
            </div>
            </div>
        </InfiniteScroll>
          
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" onClick={this.handleprevclick} className="btn btn-info">&larr; prev</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handlenextclick} className="btn btn-info">next &rarr;</button>
        </div> */}
       </>
      
    );
  }
}

export default News;






