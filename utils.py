import csv


def csv_to_train_data(csv_file_path, bot_col, resp_col):
    """
    Converts csv to training data
    """
    with open(csv_file_path, encoding='utf-8') as f:
        csv_reader = csv.reader(f, delimiter=',')

        data = []
        for row in csv_reader:
            try:
                data.extend([row[resp_col], row[bot_col]])
            except:
                pass

    return data
