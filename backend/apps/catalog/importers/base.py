class BaseImporter:
    def __init__(self, stdout=None, stderr=None):
        self.stdout = stdout
        self.stderr = stderr
        self.created = 0
        self.updated = 0
        self.errors = 0

    def log(self, msg):
        if self.stdout:
            self.stdout.write(msg)

    def err(self, msg):
        if self.stderr:
            self.stderr.write(msg)

    def run(self, file_path, dry_run=False, atomic=True):
        raise NotImplementedError

    def _result(self):
        return {'created': self.created, 'updated': self.updated, 'errors': self.errors}
