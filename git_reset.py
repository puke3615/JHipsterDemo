import subprocess

subprocess.call('chmod -R 777 ./', shell=True)


def invoke(command):
    sp = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)

    stderr = sp.stderr
    stdout = sp.stdout

    success = stderr is None
    result = stdout.read() if success else stderr.read()

    return success, result


def handle_result(ret):
    success, result = ret
    if not success:
        print(result)
        exit()
    return result


RESET_HARD = False
DELETE_UN_TRACKED = False

if __name__ == '__main__':
    if RESET_HARD:
        invoke('git reset --hard origin/develop')
    lines = handle_result(invoke('git status')).split('\n')
    lines = [line for line in lines if line and ' ' not in line]
    print('\n'.join(lines))

    if DELETE_UN_TRACKED:
        for line in lines:
            if line.endswith('/'):
                handle_result(invoke('rm -r %s' % line))
            else:
                handle_result(invoke('rm %s' % line))

    print('Git reset completed.')
