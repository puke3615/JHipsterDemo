import subprocess

subprocess.call('chmod -R 777 ./', shell=True)


def invoke(command, exit_when_fail=True):
    sp = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)

    stderr = sp.stderr
    stdout = sp.stdout

    success = stderr is None
    result = stdout.read() if success else stderr.read()

    if not success and exit_when_fail:
        print(result)
        exit()

    return success, result


RESET_HARD = True
DELETE_UN_TRACKED = True

if __name__ == '__main__':
    if RESET_HARD:
        invoke('git reset --hard origin/develop')
    lines = invoke('git status')[1].split('\n')
    lines = [line for line in lines if line and ' ' not in line]
    print('\n'.join(lines))

    if DELETE_UN_TRACKED:
        for line in lines:
            if line.endswith('/'):
                invoke('rm -r %s' % line)
            else:
                invoke('rm %s' % line)

    print('Git reset completed.')
