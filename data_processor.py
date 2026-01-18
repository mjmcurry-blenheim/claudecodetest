"""Data processor with common bugs"""

import json

class DataProcessor:
    def __init__(self):
        self.data = []

    # Fixed: File handle properly closed using context manager
    def load_data(self, filename):
        with open(filename, 'r') as file:
            data = json.load(file)
        return data

    # Bug: Mutable default argument
    def process_items(self, items=[]):
        items.append("processed")
        return items

    # Bug: Catching too broad exception
    def parse_number(self, value):
        try:
            return int(value)
        except:
            return 0

    # Bug: String concatenation in loop
    def generate_report(self, items):
        report = ""
        for item in items:
            report += f"Item: {item}\n"  # Inefficient
        return report

    # Bug: Modifying list during iteration
    def remove_negatives(self, numbers):
        for num in numbers:
            if num < 0:
                numbers.remove(num)
        return numbers

    # FIXME: SQL injection vulnerability
    def query_user(self, user_id):
        query = f"SELECT * FROM users WHERE id = {user_id}"
        # This would be vulnerable if executed
        return query
