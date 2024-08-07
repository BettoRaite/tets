import { areSame } from "../utils/compare.js";

class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  private getNode(prefix: string): TrieNode | null {
    let curr = this.root;
    for (const c of prefix) {
      if (!curr.children[c]) {
        return null;
      }
      curr = curr.children[c];
    }
    return curr;
  }
  insert(word: string) {
    let node: TrieNode = this.root;
    for (const c of word) {
      let nextNode = node.children[c];
      if (nextNode) {
        node = nextNode;
      } else {
        nextNode = new TrieNode();
        node.children[c] = nextNode;
        node = nextNode;
      }
    }
    node.isEndOfWord = true;
  }
  search(word: string): boolean {
    const node = this.getNode(word);
    return node?.isEndOfWord ?? false;
  }
  startsWith(prefix: string): boolean {
    const curr = this.getNode(prefix);
    return Boolean(curr);
  }
  wordsWith(prefix: string): string[] {
    const words: string[] = [];
    const curr = this.getNode(prefix);
    if (!curr) {
      return words;
    }
    if (curr.isEndOfWord) {
      words.push(prefix);
    }
    this.lookUp(curr, prefix, words);
    return words;
  }
  private lookUp(curr: TrieNode, prefix: string, words: string[]) {
    for (const c of Object.keys(curr.children)) {
      const node = curr.children[c];
      const newPrefix = prefix + c;

      if (node.isEndOfWord) {
        words.push(newPrefix);
      }

      this.lookUp(node, newPrefix, words);
    }
  }
}
const trie = new Trie();
const words = [
  "cat",
  "cats",
  "catze",
  "cattle",
  "camo",
  "cascade",
  "calistenics",
  "carnage",
];
for (const word of words) {
  trie.insert(word);
}
console.log(areSame(words, trie.wordsWith("ca")));
