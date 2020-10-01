import '@/styles/footer.scss'
export default {
  data() {
    return {
      author: "Fallen-down",
    };
  },
  render() {
    return (
      <footer class="page-footer">
        <span>Written by {this.author}</span>
      </footer>
    );
  },
};
